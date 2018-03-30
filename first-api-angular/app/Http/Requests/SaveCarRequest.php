<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;


class SaveCarRequest extends FormRequest
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
            'title' => 'required|min:5',
            'description' => 'required',
            'price' => 'required',
            'status' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'El titulo es requerido',
            'title.min' => 'El titulo es de minimo 5 caracteres',
            'description.required' => 'La descrición es requerida',
            'price.required' => 'El precio es requerido',
            'status.required' => 'El estatus es requerido'
        ];

    }
}
