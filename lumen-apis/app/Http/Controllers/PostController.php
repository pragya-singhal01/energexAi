<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class PostController extends Controller
{
    public function index()
    {
        // Try to get posts from Redis cache
        $posts = Cache::get("posts.all");

        /**
         * Check Redis Cache, if has posts return data
         * if not, fetch from db
         */
        if (!$posts) {
            // Cache miss: fetch from DB and store in Redis
            $posts = Post::with('user')->get();

            // Store in Redis for 60 seconds
            Cache::put("posts.all", $posts, 60);
        }

        return response()->json(['success' => true, 'posts' => $posts], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'content' => 'required|string'
        ]);

        if ($validator->fails()) {
            return response()->json(['success' => false, 'errors' => $validator->errors()], 400);
        }

        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => auth()->id()
        ]);

        Cache::forget('posts.all');

        return response()->json(['success' => true, 'post' => $post], 201);
    }

    public function show($id)
    {
        $cacheKey = "posts.$id";

        $post = Cache::remember($cacheKey, 60, function () use ($id) {
            return Post::find($id);
        });

        if (!$post) {
            return response()->json(['success' => false, 'message' => 'Post not found'], 404);
        }

        return response()->json(['success' => true, 'post' => $post], 200);
    }
}
