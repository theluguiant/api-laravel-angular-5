<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Helpers\JwtAuth;

class CheckTokenController extends Controller
{

    public function getJwtAuth(){
        return new JwtAuth();
    }

    public function checkToken($hash){
        $oJwtAuth = new JwtAuth();
        return $oJwtAuth->checkToken($hash);
    }
}
