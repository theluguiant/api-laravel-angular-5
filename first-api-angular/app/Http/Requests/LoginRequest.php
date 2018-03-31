<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
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

    public function rules()
    {
        return [
            'email'    => 'required|email|exists:users,email',
            'password' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'email.required'    => 'El email es requerido',
            'email.email'       => 'El email es invalido',
            'email.exists'      => 'El email es invalido',
            'password.required' => 'El password es requerido'
        ];

    }
}
