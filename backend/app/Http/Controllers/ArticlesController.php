<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;


class ArticlesController extends Controller
{
    public function index()
    {
        return Articles::with('Category')->get();
    }

    public function store(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'title' => 'required',
                'description' => 'required',
                'price' => 'required|numeric'
            ]
        );
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        } else {
            return Articles::create($request->all());
        }
    }

    public function show($id)
    {
        return Articles::find($id);
    }

    public function update(Request $request, $id)
    {
        try {
            $Articles = Articles::findOrFail($id);
        } catch (ModelNotFoundException $ex) {
            return response()->json(['message' => 'No Product found'], 400);
        }
        $Articles->update($request->all());
        return Articles::with('Category')->get();
    }

    public function destroy($id)
    {
        return  Articles::destroy($id);
    }
}
