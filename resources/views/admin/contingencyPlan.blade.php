<link href="{{ asset('/css/app.css') }}" rel="stylesheet">
<div class="container">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<div class="panel panel-default">
				<div class="panel-heading">设置应急预案</div>
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

					<form class="form-horizontal" role="form" method="POST" action="/admin/contingencyPlan">
						<input type="hidden" name="_token" value="{{ csrf_token() }}">

						<div class="form-group">
							<label class="col-md-4 control-label">应急预案名</label>
							<div class="col-md-6">
								<input type="text"class="form-control"name="name">
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label">安置人口数</label>
							<div class="col-md-6">
								<input type="text" class="form-control" name="affected_population">
							</div>
						</div>

						<div class="form-group">
							<label class="col-md-4 control-label">死亡人口数</label>
							<div class="col-md-6">
								<input type="text" class="form-control" name="dead_population">
							</div>
						</div>

            <div class="form-group">
							<label class="col-md-4 control-label">房屋倒塌数</label>
							<div class="col-md-6">
								<input type="text" class="form-control" name="building_collapse">
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
