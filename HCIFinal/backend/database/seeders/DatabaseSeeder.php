<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Section;
use App\Models\Student;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Seed BSIT Sections (16 total: 1A-1D, 2A-2D, 3A-3D, 4A-4D)
        $sections = [
            1 => ['1A', '1B', '1C', '1D'],
            2 => ['2A', '2B', '2C', '2D'],
            3 => ['3A', '3B', '3C', '3D'],
            4 => ['4A', '4B', '4C', '4D'],
        ];

        foreach ($sections as $year => $names) {
            foreach ($names as $name) {
                Section::firstOrCreate(
                    ['name' => $name],
                    ['year_level' => $year, 'department' => 'BSIT']
                );
            }
        }

        // 2. Seed BSIT Courses (Exact courses from Figma mock)
        $courses = [
            ['code' => 'PROG1', 'name' => 'Programming 1', 'sections' => 'BSIT 1A–4D'],
            ['code' => 'PROG2', 'name' => 'Programming 2', 'sections' => 'BSIT 1A–4D'],
            ['code' => 'OOP1',  'name' => 'Object-Oriented Programming 1', 'sections' => 'BSIT 1A–4D'],
            ['code' => 'OOP2',  'name' => 'Object-Oriented Programming 2', 'sections' => 'BSIT 1A–4D'],
            ['code' => 'HCI',   'name' => 'Human-Computer Interaction',   'sections' => 'BSIT 1A–4D'],
        ];

        foreach ($courses as $c) {
            Course::firstOrCreate(
                ['code' => $c['code']],
                ['name' => $c['name'], 'sections' => $c['sections']]
            );
        }

        // 3. Seed Students (Exactly 120 students to match the Figma metric card)
        $firstNames = [
            'Juan', 'Maria', 'Pedro', 'Jose', 'Ana', 'Mark', 'John', 'Angela',
            'Angelo', 'Christian', 'Joshua', 'Princess', 'Bea', 'Carlos', 'Gabriel',
            'Hannah', 'Nicole', 'Daniel', 'Paul', 'Patricia', 'Kevin', 'Alyssa',
            'Michael', 'Rochelle', 'Kim', 'Jerome', 'Justine', 'Katrina', 'Ezekiel',
            'Janelle', 'Jayson', 'Kyla', 'Rafael', 'Stephanie', 'Paolo', 'Erika'
        ];

        $lastNames = [
            'Dela Cruz', 'Santos', 'Reyes', 'Garcia', 'Mendoza', 'Torres', 'Flores',
            'Villanueva', 'Bautista', 'Castro', 'Ramos', 'Aquino', 'Fernandez',
            'Navarro', 'Salazar', 'Delos Santos', 'Tolentino', 'Morales', 'Pascual',
            'Ocampo', 'Valdez', 'Padilla', 'Mercado', 'Cortez', 'Domingo', 'Soriano'
        ];

        $allSections = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D', '3A', '3B', '3C', '3D', '4A', '4B', '4C', '4D'];

        // Exact initial 3 records from Figma (with realistic minor typos for the AI health inspector to audit)
        $initialStudents = [
            ['student_id' => '001', 'first_name' => 'Juan', 'last_name' => 'Dela Cruz', 'email' => 'juan.delacruz@email.com', 'course' => 'BSIT', 'section' => '1A'],
            ['student_id' => '002', 'first_name' => 'Maria', 'last_name' => 'Santos', 'email' => 'maria.santos@email.com', 'course' => 'BSIT', 'section' => '2A'],
            ['student_id' => '003', 'first_name' => 'Pedro', 'last_name' => 'Reyes', 'email' => 'pedro.reyes@gmai.com', 'course' => 'BSIT', 'section' => '3B'],
            ['student_id' => '006', 'first_name' => 'Mark', 'last_name' => 'Garcia', 'email' => 'mark.garcia@email.com', 'course' => 'BSIT', 'section' => '4D'], // 1st year student placed in 4th year section
            ['student_id' => '121', 'first_name' => 'Juan', 'last_name' => 'Delacruz', 'email' => 'jdelacruz.alt@email.com', 'course' => 'BSIT', 'section' => '1A'], // Duplicate of Juan Dela Cruz
        ];

        foreach ($initialStudents as $s) {
            Student::firstOrCreate(['student_id' => $s['student_id']], $s);
        }

        // Generate remaining students up to 120
        for ($i = 4; $i <= 120; $i++) {
            $studentId = str_pad((string)$i, 3, '0', STR_PAD_LEFT);
            $fn = $firstNames[($i - 1) % count($firstNames)];
            $ln = $lastNames[intdiv($i - 1, count($firstNames)) % count($lastNames)];
            $sec = $allSections[($i - 1) % count($allSections)];
            $email = strtolower($fn . '.' . str_replace(' ', '', $ln) . $i . '@email.com');

            Student::firstOrCreate(
                ['student_id' => $studentId],
                [
                    'first_name' => $fn,
                    'last_name'  => $ln,
                    'email'      => $email,
                    'course'     => 'BSIT',
                    'section'    => $sec,
                ]
            );
        }
    }
}
