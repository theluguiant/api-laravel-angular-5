<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use DB;
use Validator;
use App\Http\Controllers\InputController;
use App\Http\Requests\UserRequest;
use App\Helpers\JwtAuth;
use App\Http\Requests\LoginRequest;

class UserController extends Controller
{
    public $oInput;

  
    public function register(Request $request){

        $aJson = $request->input('json',null);

      
        $this->oInput = new InputController();
       
        $aParams  = $this->oInput->processResquest($aJson)['aParams'];
        $aParamsArray = $this->oInput->processResquest($aJson)['aParamsArray'];
        
        $oUserRequest = new UserRequest();

       // var_dump($oUserRequest->messages());exit();

        $oValidatedData = Validator::make(
            $aParamsArray,
            $oUserRequest->rules(),
            $oUserRequest->messages()
        );

        $aData = [];
        if ($oValidatedData->passes()) {

            $oUser = new User();
            $oUser->email =  $aParams->email;
            $oUser->password = bcrypt($aParams->password);
            $oUser->username = $aParams->username;
            $oUser->name = $aParams->name;
            $oUser->role = 2;

            if($oUser->save()){
                
                $aData = [
                    'status' => 'success',
                    'type'   => 'payload',
                    'code'   => 200,
                    'msn'    => 'El usuario fue registrado con exito'
                ];
            }else{

                $aData = [
                        'status'  => 'error',
                        'type'    => 'nosave',
                        'code'   => 200,
                        'msn'     => 'El usuario fue registrado con exito',
                        'payload' => null
                    ];
            }    
            
        }else{

            $aData = [
                'status'  => 'error',
                'type'    => 'validation',
                'code'   => 200,
                'msn'     => 'Un error a ocurrido al enviar los datos',
                'payload' => $oValidatedData->errors()
            ];

        }

     
     

        return response()->json($aData,200);

    }

    public function login(Request $request){
        $oJwtAuth = new JwtAuth();

        $aJson = $request->input('json',null);

      
        $this->oInput = new InputController();
       
        $aParams  = $this->oInput->processResquest($aJson)['aParams'];
        $aParamsArray = $this->oInput->processResquest($aJson)['aParamsArray'];

        $oLoginRequest = new LoginRequest();
       

        $oValidatedData = Validator::make(
            $aParamsArray,
            $oLoginRequest->rules(),
            $oLoginRequest->messages()
        );

        $aData = [];
        if ($oValidatedData->passes()) {
         
            if(isset($aParams->gettoken)){

                $aSignup =[
                        'status'  => 'success',
                        'code'   => 200,
                        'payload' => [
                            'token' => $oJwtAuth->signup($aParams->email,$aParams->password,$aParams->gettoken)
                        ]
                    ];
           
            }else{

                $aSignup = [
                    'status'  => 'success',
                    'code'   => 200,
                    'payload' => [
                        'token' => $oJwtAuth->signup($aParams->email,$aParams->password)
                    ]
                ];
        
            }

        }else{
            $aSignup =  [
                'status'  => 'error',
                'code'   => 200,
                'msn'     => 'Un error a ocurrido al enviar los datos',
                'payload' => $oValidatedData->errors()
            ];
        }

       
        return response()->json($aSignup,200);


    }
}
