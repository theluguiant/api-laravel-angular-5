<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InputController extends Controller
{
    public function processResquest($aJson){
        $aParams = json_decode($aJson);

        $aParamsArray = [];
        foreach ($aParams as $sKey => $mValue){
            $aParamsArray[$sKey] = $mValue;
        }

        return  [
                    'aParams'=>$aParams,
                    'aParamsArray'=>$aParamsArray
                ];
    }
}
