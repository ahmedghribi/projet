<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use App\Models\Categories;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function ArticlesInCategory()
    {
        $categories = Categories::with('Article')->get();
        $CatArray = [];
        $CatArticles = [];
        foreach ($categories as $cat) {
            $CatArray = [
                'CategoryID' => $cat->id,
                'CategoryName' => $cat->name,
                'NumberArticles' => count($cat->Article)
            ];
            array_push($CatArticles, $CatArray);
        }
        return $CatArticles;
    }
    public function TotalArticles()
    {
        return Articles::all()->count();
    }
    public function TotalCategory()
    {
        return Categories::all()->count();
    }
}
