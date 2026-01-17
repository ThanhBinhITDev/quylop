<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStructureTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // 1. Cai thien bang Users (Mac dinh Laravel da co, ta them cot vao)
        Schema::table('users', function (Blueprint $table) {
            $table->string('student_code')->nullable()->unique()->after('email'); // Ma SV
            $table->string('role')->default('student')->after('password'); // admin | student
            $table->string('phone')->nullable()->after('name');
            $table->string('avatar_url')->nullable();
        });

        // 2. Bang Bank Accounts (Tai khoan Ngan hang cua Quy)
        Schema::create('bank_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('bank_name'); // MBBank
            $table->string('account_number'); // STK
            $table->string('account_name'); // Chu TK
            $table->string('bin')->nullable(); // Ma BIN VietQR
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 3. Bang Bank Transactions (Lich su Giao dich Ngan hang)
        Schema::create('bank_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_code')->unique(); // Ma GD (FT...)
            $table->decimal('amount', 15, 2); // So tien
            $table->string('description')->nullable(); // Noi dung CK
            $table->dateTime('transaction_date'); // Ngay gio GD
            $table->unsignedBigInteger('user_id')->nullable(); // Tu dong gan voi User neu tim thay
            $table->string('status')->default('pending'); // pending | processed
            $table->timestamps();
        });

        // 4. Bang Funds (Cac khoan thu - Quy tuan/thang)
        Schema::create('funds', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Quy Tuan 1, Ao lop...
            $table->decimal('amount', 15, 2); // So tien phai dong
            $table->text('description')->nullable();
            $table->string('type')->default('weekly'); // weekly | monthly | one_time
            $table->dateTime('deadline')->nullable();
            $table->timestamps();
        });

        // 5. Bang Fund Contributions (Theo doi ai da dong tien)
        Schema::create('fund_contributions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('fund_id');
            $table->unsignedBigInteger('bank_transaction_id')->nullable(); // Link toi giao dich ngan hang
            $table->string('status')->default('unpaid'); // unpaid | paid
            $table->dateTime('paid_at')->nullable();
            $table->timestamps();

            // Khoa ngoai
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('fund_id')->references('id')->on('funds')->onDelete('cascade');
        });

        // 6. Bang Expenses (Chi tieu)
        Schema::create('expenses', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Mua gi?
            $table->decimal('amount', 15, 2);
            $table->text('description')->nullable();
            $table->string('proof_image')->nullable(); // Anh hoa don
            $table->dateTime('expense_date');
            $table->foreignId('created_by')->constrained('users'); // Nguoi tao lenh chi
            $table->timestamps();
        });

        // 7. Bang Todos (Cong viec)
        Schema::create('todos', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('priority')->default('normal'); // high | normal | low
            $table->string('status')->default('pending'); // pending | in_progress | completed
            $table->text('note')->nullable();
            $table->dateTime('due_date')->nullable(); // Han chot
            $table->unsignedBigInteger('assignee_id')->nullable(); // Giao cho ai
            $table->timestamps();

            $table->foreign('assignee_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('todos');
        Schema::dropIfExists('expenses');
        Schema::dropIfExists('fund_contributions');
        Schema::dropIfExists('funds');
        Schema::dropIfExists('bank_transactions');
        Schema::dropIfExists('bank_accounts');

        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['student_code', 'role', 'phone', 'avatar_url']);
        });
    }
}
