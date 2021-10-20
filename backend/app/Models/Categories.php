<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    use HasFactory;

    protected $table = 'categories';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'name', 'image'
    ];

    public function Article()
    {
        return $this->hasMany(Articles::class, 'category_id');
    }
}
