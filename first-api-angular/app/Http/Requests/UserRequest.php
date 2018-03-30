<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
   /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'email'    => 'required|email|unique:users,email',
            'name'     => 'required|min:3|max:150',
            'username' => 'required|min:3|unique:users,username|max:150',
            'password' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'email.required'    => 'El email es requerido',
            'email.email'    => 'El email es invalido',
            'email.unique'    => 'El email ya fue registrado',
            'name.required'     => 'El nombre es requerido',
            'name.min'     => 'El nombr es de minimo 3 caracteres',
            'name.max'     => 'El nombre es de maximo 150 caracteres',
            'name.alpha_num'     => 'El nombre es alfa-numerico',
            'username.required' => 'El username es requerido',
            'username.min' => 'El username es de minimo 3 caracteres',
            'username.unique' => 'El username ya fue registrado',
            'username.max' => 'El username es de maximo 150 caracteres',
            'password.required' => 'El password es requerido'
        ];

    }
}
