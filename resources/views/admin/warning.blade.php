<link href="{{ asset('/css/app.css') }}" rel="stylesheet">
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">
                <div class="panel-heading">设置预警规则</div>
                <div class="panel-body">
                    @if (count($errors) > 0)
                        <div class="alert alert-danger">
                            <strong>Whoops!</strong> There were some problems with your input.<br><br>
                            <ul>
                                @foreach ($errors->all() as $error)
                                    <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                    @endif

                    <form class="form-horizontal" role="form" method="POST" action="/admin/warning">
                        <input type="hidden" name="_token" value="{{ csrf_token() }}">

                        <div class="form-group">
                            <label class="col-md-4 control-label">预警名</label>
                            <div class="col-md-6">
                                <input type="text"class="form-control"name="title">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">等级</label>
                            <div class="col-md-6">
                                <select class="form-control" name="level">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">监测的字段</label>
                            <div class="col-md-6">
                                <select class="form-control" name="key">
                                    <option value="temperature">气温</option>
                                    <option value="rain_fall">降雨量</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">阀值</label>
                            <div class="col-md-6">
                                <input type="text" class="form-control" name="value">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">预警内容</label>
                            <div class="col-md-6">
                                <textarea class="form-control" name="content"></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">提交</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    </div>
</div>
