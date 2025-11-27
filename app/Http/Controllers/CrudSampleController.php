<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CrudSameple;
use Inertia\Inertia;

class CrudSampleController extends Controller
{
    public function index()
    {
        $samples = CrudSameple::all();
        return Inertia::render('crud', [
            'crudItems' => $samples,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantity' => 'required|integer',
        ]);

        CrudSameple::create([
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'quantity' => $request->input('quantity'),
        ]);

        return redirect()->route('crud');
    }
}
