<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Section;
use Illuminate\Http\JsonResponse;

class SectionController extends Controller
{
    /**
     * List all sections, with grouped-by-year structure.
     */
    public function index(): JsonResponse
    {
        $all = Section::orderBy('year_level')->orderBy('name')->get();

        $grouped = [
            1 => $all->where('year_level', 1)->values(),
            2 => $all->where('year_level', 2)->values(),
            3 => $all->where('year_level', 3)->values(),
            4 => $all->where('year_level', 4)->values(),
        ];

        return response()->json([
            'all'     => $all,
            'grouped' => $grouped,
        ]);
    }
}
