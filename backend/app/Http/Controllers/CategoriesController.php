<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class CategoriesController extends Controller
{

    public function index()
    {
        return Categories::all();
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'image' => 'required',
            ]
        );
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        } else {
            return Categories::create($request->all());
        }
    }

    public function show($id)
    {
        return Categories::find($id);
    }

    public function update(Request $request, $id)
    {
        try {
            $Categories = Categories::findOrFail($id);
        } catch (ModelNotFoundException $ex) {
            return response()->json(['message' => 'No Product found'], 400);
        }
        $Categories->update($request->all());
        return Categories::all();
    }

    public function destroy($id)
    {
        return  Categories::destroy($id);
    }
}
