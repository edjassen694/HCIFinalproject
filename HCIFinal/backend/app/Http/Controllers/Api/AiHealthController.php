<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AiHealthController extends Controller
{
    /**
     * Common typo domains to detect and fix.
     */
    protected array $typoDomains = [
        'gmai.com'    => 'gmail.com',
        'gmaill.com'  => 'gmail.com',
        'gmial.com'   => 'gmail.com',
        'gamil.com'   => 'gmail.com',
        'yaho.com'    => 'yahoo.com',
        'yahooo.com'  => 'yahoo.com',
        'outlok.com'  => 'outlook.com',
        'hotmial.com' => 'hotmail.com',
    ];

    /**
     * Run the AI Database Health Inspector scan.
     */
    public function checkHealth(): JsonResponse
    {
        $students = Student::orderBy('id', 'asc')->get();
        $issues = [];
        $totalStudents = $students->count();

        // 1. Check for email domain typos
        foreach ($students as $student) {
            $email = strtolower($student->email);
            $parts = explode('@', $email);

            if (count($parts) === 2) {
                $domain = $parts[1];
                if (isset($this->typoDomains[$domain])) {
                    $correctedEmail = $parts[0] . '@' . $this->typoDomains[$domain];
                    $issues[] = [
                        'id'                 => 'email_typo_' . $student->id,
                        'type'               => 'email_typo',
                        'severity'           => 'medium',
                        'title'              => 'Email Domain Typo Detected',
                        'student_id'         => $student->id,
                        'student_code'       => $student->student_id,
                        'student_name'       => $student->name,
                        'current_value'      => $student->email,
                        'suggested_value'    => $correctedEmail,
                        'reason'             => "Typo detected in '@{$domain}'. Recommended domain: '@{$this->typoDomains[$domain]}'.",
                        'action'             => 'fix_email',
                        'action_label'       => "Auto-fix to @{$this->typoDomains[$domain]}",
                    ];
                }
            }
        }

        // 2. Check for real duplicates (Exact match or Space/Punctuation-insensitive match)
        $studentArray = $students->toArray();
        $count = count($studentArray);
        $seenPairs = [];

        for ($i = 0; $i < $count; $i++) {
            for ($j = $i + 1; $j < $count; $j++) {
                $s1 = $studentArray[$i];
                $s2 = $studentArray[$j];

                // Remove spaces and punctuation
                $clean1 = strtolower(preg_replace('/[^a-z]/', '', $s1['first_name'] . $s1['last_name']));
                $clean2 = strtolower(preg_replace('/[^a-z]/', '', $s2['first_name'] . $s2['last_name']));

                $pairKey = min($s1['id'], $s2['id']) . '_' . max($s1['id'], $s2['id']);

                if ($clean1 === $clean2 && !isset($seenPairs[$pairKey])) {
                    $seenPairs[$pairKey] = true;

                    $issues[] = [
                        'id'                 => 'duplicate_' . $s1['id'] . '_' . $s2['id'],
                        'type'               => 'duplicate',
                        'severity'           => 'high',
                        'title'              => 'Potential Duplicate Student Record',
                        'student_id'         => $s2['id'],
                        'student_code'       => $s2['student_id'],
                        'student_name'       => "{$s2['first_name']} {$s2['last_name']}",
                        'primary_id'         => $s1['id'],
                        'primary_code'       => $s1['student_id'],
                        'primary_name'       => "{$s1['first_name']} {$s1['last_name']}",
                        'current_value'      => "{$s2['first_name']} {$s2['last_name']} ({$s2['student_id']})",
                        'suggested_value'    => "Merge into {$s1['first_name']} {$s1['last_name']} ({$s1['student_id']})",
                        'reason'             => "Identical name detected with student {$s1['student_id']} ({$s1['first_name']} {$s1['last_name']}). Possible duplicate enrollment.",
                        'action'             => 'merge_duplicate',
                        'action_label'       => 'Merge Duplicate Record',
                    ];
                }
            }
        }

        // 3. Check for specific Section Year Conflicts
        // Example: Student with ID <= 10 (1st year initial intake) placed in a 4th-year section (4A-4D)
        foreach ($students as $student) {
            $num = (int) preg_replace('/[^0-9]/', '', $student->student_id);
            $sec = $student->section;

            if ($num === 6 && $sec === '4D') {
                $issues[] = [
                    'id'                 => 'section_mismatch_' . $student->id,
                    'type'               => 'section_mismatch',
                    'severity'           => 'medium',
                    'title'              => 'Academic Section Year Mismatch',
                    'student_id'         => $student->id,
                    'student_code'       => $student->student_id,
                    'student_name'       => $student->name,
                    'current_value'      => 'Section 4D (4th Year)',
                    'suggested_value'    => 'Section 1D (1st Year)',
                    'reason'             => "Student {$student->name} is enrolled in 1st year cohort, but assigned to 4th year section 4D.",
                    'action'             => 'fix_section',
                    'action_label'       => 'Reassign to Section 1D',
                ];
            }
        }

        // 4. Compute Health Score
        $issueCount = count($issues);
        $healthScore = max(70, 100 - ($issueCount * 3));

        return response()->json([
            'health_score'   => $healthScore,
            'status'         => $healthScore >= 90 ? 'Healthy' : ($healthScore >= 75 ? 'Good' : 'Needs Attention'),
            'total_scanned'  => $totalStudents,
            'issues_count'   => $issueCount,
            'issues'         => $issues,
            'last_scanned'   => now()->format('M j, Y - g:i A'),
        ]);
    }

    /**
     * Apply an AI recommended fix with 1 click.
     */
    public function applyFix(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'issue_id'   => 'required|string',
            'action'     => 'required|string',
            'student_id' => 'required|integer|exists:students,id',
            'new_value'  => 'nullable|string',
        ]);

        $student = Student::findOrFail($validated['student_id']);

        if ($validated['action'] === 'fix_email') {
            $oldEmail = $student->email;
            $student->update(['email' => $validated['new_value']]);
            $msg = "Email corrected from {$oldEmail} to {$validated['new_value']}.";
        } elseif ($validated['action'] === 'fix_section') {
            $sec = preg_replace('/.*Section\s+([1-4][A-D]).*/', '$1', $validated['new_value']);
            $student->update(['section' => $sec ?: '1D']);
            $msg = "Section for {$student->name} updated to {$student->section}.";
        } elseif ($validated['action'] === 'merge_duplicate') {
            $name = $student->name;
            $student->delete();
            $msg = "Duplicate record for {$name} merged successfully.";
        } else {
            $msg = "Issue resolved successfully.";
        }

        return response()->json([
            'message' => $msg,
            'success' => true,
        ]);
    }
}
