<?php

namespace App\Http\Controllers;

use App\Models\Survey;
use App\Http\Requests\StoreSurveyRequest;
use App\Http\Requests\UpdateSurveyRequest;
use Illuminate\Http\Request;
use App\Http\Resources\SurveyResource;

class SurveyController extends Controller
{

    public function index(Request $request)
    {
        $user = $request->user();
        return SurveyResource::collection(Survey::where('user_id', $user->id)->paginate());
    }


    public function store(StoreSurveyRequest $request)
    {
        $result = Survey::create($request->validated());
        return new SurveyResource($result);
    }


    public function show(Survey $survey, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403, 'Unauthorized action.');
        }
        return new SurveyResource($survey);
    }


    public function update(UpdateSurveyRequest $request, Survey $survey)
    {
        $survey->update($request->validated());
        return new SurveyResource($survey);
    }


    public function destroy(Survey $survey, Request $request)
    {
        $user = $request->user();
        if ($user->id !== $survey->user_id) {
            return abort(403, 'Unauthorized action.');
        }
        $survey->delete();
        return response('', 204);
    }
}
