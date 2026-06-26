<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Change from decimal(10,2) to decimal(15,2) – supports up to 999,999,999,999.99
            $table->decimal('total_price', 15, 2)->change();
        });

        Schema::table('tours', function (Blueprint $table) {
            // Also increase price column for consistency
            $table->decimal('price', 15, 2)->change();
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->decimal('total_price', 10, 2)->change();
        });

        Schema::table('tours', function (Blueprint $table) {
            $table->decimal('price', 10, 2)->change();
        });
    }
};
