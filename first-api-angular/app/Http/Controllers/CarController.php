<?php

namespace App\Http\Controllers;

use App\Car;
use Illuminate\Http\Request;
use App\Helpers\JwtAuth;
use Validator;
use App\Http\Requests\SaveCarRequest;
use App\Http\Requests\UpdateCarRequest;
use App\Http\Controllers\CheckTokenController;
use App\Http\Controllers\InputController as CustomInputController;

class CarController extends Controller
{
    public $oToken;
    public $oInput;

    public function __construct()
    {
        $this->oToken = new CheckTokenController();
        $this->oToken = $this->oToken->getJwtAuth();
        $this->oInput = new CustomInputController();
    }

    public function index(Request $request){

        $hash = $request->header('Authorization',null);

        $aData = [];
        if($this->oToken->checkToken($hash)){

            $aCarsAll = Car::all();

            $aData = [
                'status' => 'success',
                'type'   => 'payload',
                'code'   => 200,
                'msn'    => 'El carro fue registrado con exito',
                'payload' => $aCarsAll
            ];
        }else{
            $aData = [
                'status' => 'error',
                'type'   => 'nologin',
                'code'   => 300,
                'msn'    => 'Debe de loguear para registrar el carro',
                'payload' => null
            ];
        }

        return response()->json($aData,200);

    }

    public function show($id){
        $aCars = Car::find($id)->load('user');
        return response()->json([
            'cars'   => $aCars,
            'status' => 'success',
            'type'   => 'payload',
            'code'   => 200
        ],200);
    }


    public function store(Request $request){
        $hash = $request->header('Authorization',null);

        $aData = [];
        if($this->oToken->checkToken($hash)){

            $aJson = $request->input('json',null);

            $aParams  = $this->oInput->processResquest($aJson)['aParams'];
            $aParamsArray = $this->oInput->processResquest($aJson)['aParamsArray'];

            $aUser = $this->oToken->checkToken($hash,true);

            $oCarRequest = new SaveCarRequest();

            $oValidatedData = Validator::make(
                $aParamsArray,
                $oCarRequest->rules(),
                $oCarRequest->messages()
            );

            if ($oValidatedData->passes()) {

                $oCar = new Car();
                $oCar->user_id = $aUser->sub;
                $oCar->title = $aParams->title;
                $oCar->description = $aParams->description;
                $oCar->price = $aParams->price;
                $oCar->status = $aParams->status;

                if($oCar->save()){
                    $aData = [
                        'status' => 'success',
                        'type'   => 'payload',
                        'code'   => 200,
                        'msn'    => 'El carro fue registrado con exito',
                        'payload' => $oCar
                    ];
                }else{
                    $aData = [
                        'status'  => 'error',
                        'type'    => 'nosave',
                        'code'   => 200,
                        'msn'     => 'El carro fue registrado con exito',
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
        }else{
            $aData = [
                'status' => 'error',
                'type'   => 'nologin',
                'code'   => 300,
                'msn'    => 'Debe de loguear para registrar el carro',
                'payload' => null
            ];
        }

        return response()->json($aData,200);
    }

    public function update($id,Request $request){
        $hash = $request->header('Authorization',null);

        $aData = [];
        if($this->oToken->checkToken($hash)){
            $aUser = $this->oToken->checkToken($hash,true);

            $aJson = $request->input('json',null);

            $aParams  = $this->oInput->processResquest($aJson)['aParams'];
            $aParamsArray = $this->oInput->processResquest($aJson)['aParamsArray'];
            $oCarRequest = new SaveCarRequest();

            $oValidatedData = Validator::make(
                $aParamsArray,
                $oCarRequest->rules(),
                $oCarRequest->messages()
            );

            if ($oValidatedData->passes()) {

                if(Car::where('id',$id)->update($aParamsArray)){
                    $aData = [
                        'status' => 'success',
                        'type'   => 'payload',
                        'code'   => 200,
                        'msn'    => 'El carro fue registrado con exito',
                        'payload' => null
                    ];
                }else{
                    $aData = [
                        'status' => 'error',
                        'type'   => 'updateerror',
                        'code'   => 200,
                        'msn'    => 'Error al guardar cambios',
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

        }else{
            $aData = [
                'status' => 'error',
                'type'   => 'nologin',
                'code'   => 300,
                'msn'    => 'Debe de loguear para registrar el carro',
                'payload' => null
            ];
        }

        return response()->json($aData,200);

    }

    public function destroy($id,Request $request){
        $hash = $request->header('Authorization',null);

        $aData = [];
        if($this->oToken->checkToken($hash)) {

            $oCar = Car::find($id);

            if(!empty($oCar)){
                if($oCar->delete()){
                    $aData = [
                        'status' => 'success',
                        'type'   => 'payload',
                        'code'   => 200,
                        'msn'    => 'El carro fue eliminado con exito',
                        'payload' => $oCar
                    ];
                }else{
                    $aData = [
                        'status' => 'error',
                        'type'   => 'destroyerror',
                        'code'   => 200,
                        'msn'    => 'Error al eliminar',
                        'payload' => null
                    ];
                }
            }else{
                $aData = [
                    'status' => 'error',
                    'type'   => 'destroyerror',
                    'code'   => 200,
                    'msn'    => 'Error el registro no existe',
                    'payload' => null
                ];
            }
        }else{
            $aData = [
                'status' => 'error',
                'type'   => 'nologin',
                'code'   => 300,
                'msn'    => 'Debe de loguear para registrar el carro',
                'payload' => null
            ];
        }

        return response()->json($aData,200);
    }

}
