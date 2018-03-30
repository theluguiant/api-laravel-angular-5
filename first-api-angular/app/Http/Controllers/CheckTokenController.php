<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use App\Http\Controllers\InputController;
use Firebase\JWT\JWT;

class CheckTokenController extends Controller
{

    public $oInput;

    public function getJwtAuth(){
        return new JwtAuth();
    }

    public function checkToken($hash){
        $oJwtAuth = new JwtAuth();
        return $oJwtAuth->checkToken($hash);
    }


    public function getToken(Request $request){
        $oJwtAuth = new JwtAuth();
        $aJson = $request->input('json',null);
        $this->oInput = new InputController();       
        $aParams  = $this->oInput->processResquest($aJson)['aParams'];
        //$aParamsArray = $this->oInput->processResquest($aJson)['aParamsArray'];
        $aData = [];
        if($this->checkToken($aParams->token)){
            $mDecode = JWT::decode($aParams->token,$oJwtAuth->sKey,['HS256']);
            $aData = [
                'status'  => 'success',
                'code'   => 200,
                'payload' => $mDecode
            ];
        }else{
            $aData = [
                'status'  => 'error',
                'code'   => 200,
                'payload' => null
            ];
        }
        return response()->json($aData,200);
        
    }
}
