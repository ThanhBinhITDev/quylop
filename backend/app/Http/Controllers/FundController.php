<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FundController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $funds = DB::table('funds')->orderBy('created_at', 'desc')->get();
        return view('admin.funds.index', compact('funds'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.funds.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'deadline' => 'required|date',
            'description' => 'nullable|string',
            'type' => 'required|in:weekly,monthly,one_time'
        ]);

        $data['created_at'] = now();
        $data['updated_at'] = now();

        DB::table('funds')->insert($data);

        return redirect()->route('admin.funds.index')->with('success', 'Đã tạo quỹ mới thành công!');
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $fund = DB::table('funds')->where('id', $id)->first();
        if (!$fund) {
            return redirect()->route('admin.funds.index')->with('error', 'Quỹ không tồn tại!');
        }

        // Lay danh sach sinh vien (role = user hoac tat ca tru admin neu muon)
        // O day gia su lay tat ca users tru admin
        $students = DB::table('users')->where('role', '!=', 'admin')->get();

        // Lay danh sach da dong cho quy nay (keyBy user_id de de truy cap)
        $contributions = DB::table('fund_contributions')
            ->where('fund_id', $id)
            ->select('user_id', 'status', 'amount')
            ->get()
            ->keyBy('user_id');

        return view('admin.funds.show', compact('fund', 'students', 'contributions'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
    public function contribute(Request $request, $fundId, $userId)
    {
        $fund = DB::table('funds')->where('id', $fundId)->first();
        if (!$fund)
            return back()->with('error', 'Quỹ không tồn tại');

        // Lay so tien tu request hoac mac dinh cua quy
        $amount = $request->input('amount', $fund->amount);

        // Kiem tra xem da co ban ghi chua
        $exists = DB::table('fund_contributions')
            ->where('fund_id', $fundId)
            ->where('user_id', $userId)
            ->first();

        if ($exists) {
            // Neu co roi thi update status va amount
            DB::table('fund_contributions')
                ->where('id', $exists->id)
                ->update([
                    'status' => 'paid',
                    'amount' => $amount,
                    'updated_at' => now()
                ]);
        } else {
            // Tao moi
            DB::table('fund_contributions')->insert([
                'fund_id' => $fundId,
                'user_id' => $userId,
                'amount' => $amount,
                'status' => 'paid',
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }

        return back()->with('success', 'Đã xác nhận đóng tiền thành công!');
    }
}
