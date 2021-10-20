<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Articles extends Model
{
    use HasFactory;
    protected $table = 'articles';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'title', 'description', 'image', 'category_id', 'status', 'price'
    ];

    public function Category()
    {
        return $this->belongsTo(Categories::class);
    }
}
