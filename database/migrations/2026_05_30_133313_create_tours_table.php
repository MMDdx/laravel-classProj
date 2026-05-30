<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tours', function (Blueprint $table) {
            $table->id();                      // auto-incrementing ID
            $table->string('title');           // tour title
            $table->string('slug')->unique();  // ← add this line
            $table->text('description');       // description
            $table->decimal('price', 10, 2);   // price
            $table->date('start_date');        // start date
            $table->date('end_date');          // end date
            $table->integer('max_capacity');   // capacity
            $table->string('location');        // location
            $table->string('image_url')->nullable(); // optional image
            $table->timestamps();              // created_at & updated_at

            $table->index('start_date');
            $table->index('location');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tours');
    }
};
