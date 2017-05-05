<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ContingencyPlan;

class ContingencyPlanController extends Controller
{
    public function index()
    {
        $contingencyPlans = ContingencyPlan::all();
        return view('admin/contingencyPlan', compact('contingencyPlan'));
    }

    public function store(Request $request)
    {
        $input = $request->all();
        ContingencyPlan::create($input);

        return redirect('/admin/contingencyPlan');
    }

    public function getPlan(Request $request)
    {
        $affected_population = $request->affected_population;
        $dead_population = $request->dead_population;
        $building_collapse = $request->building_collapse;
        $array = array();
        if ($dead_population > 30) {
            $array['name'] = "Ⅰ级响应";
            $array['content'] = "1.省减灾委成立救灾应急指挥部，统一组织开展抗灾救灾工作。<br/><br/>
                               2.省民政厅全体工作人员参与灾情救助工作，实行24小时值班。<br/><br/>
                               3.省民政厅在接到灾害发生信息后，1小时内向省政府和民政部报告，
                               之后及时续报有关情况。省减灾委办公室要与灾区保持24小时专线联系，
                               随时掌握灾情动态信息，及时编发《民政灾情信息》、《重要灾情快报》
                               报送省政府和民政部，并向省减灾委成员单位通报情况。从灾害发生开始，
                               有关地级以上市民政局每日10时前要向省民政厅上报相关灾情和救灾工作动态信息。<br/><br/>";
        } else {
            if ($dead_population > 20
            ) {
                $array['name'] = "Ⅱ级响应";
                $array['content'] = "  1. 省民政厅成立救灾应急指挥部，省减灾委办公室实行24小时值班。<br/><br/>
  2. 省民政厅在接到灾害发生信息后，1小时内向省政府和民政部报告，之后及时续报有关情况。省减灾委办公室要及时掌握灾情，编发《民政灾情信息》报送省政府和民政部，并向省减灾委成员单位通报情况。从灾害发生开始，有关地级以上市民政局每日10时前要向省民政厅上报相关灾情和救灾工作动态信息。<br/><br/>
  3. 灾害发生24小时内，省民政厅派出工作组赶赴灾区指导地方开展救灾工作，慰问灾民，了解灾区救灾情况及需求，必要时建议省政府派工作组赴灾区；商省财政厅下拨救灾应急资金，并联合向民政部、财政部申请救灾应急资金；向灾区紧急调拨救灾物资；及时组织召开抗灾救灾综合协调会，落实省政府关于抗灾救灾工作指示，协调有关部门解决抗灾救灾工作有关事宜；监督基层救灾应急措施的落实和救灾款物的规范使用。<br/><br/>
  4. 省民政厅及时向社会发布接受救灾捐赠的公告，公布灾情、灾区需求、接受捐赠的单位和账号，设立救灾捐赠热线电话，按规定组织开展全省性救灾捐赠活动；定期对救灾捐赠的接收和使用情况向社会进行公告。<br/><br/>
  5. 灾情发生后，省民政厅及时组织有关专家赴灾区进行现场灾情和需求评估，形成评估报告，报民政部、省政府；灾情稳定后，及时组织召开灾情评估会，向有关部门通报评估结果。<br/><br/>";
            } else {
                if ($dead_population > 0
                ) {
                    $array['name'] = "Ⅲ级响应";
                    $array['content'] = "  1. 省减灾委办公室进入紧急应对状态，实行24小时值班。<br/><br/>
  2. 省民政厅在接到灾害发生信息后，1小时内向省政府和民政部报告，之后及时续报有关情况。省减灾委办公室要及时掌握灾情编发灾情信息，报送省政府和民政部，并向省减灾委成员单位通报情况。从灾害发生开始，有关地级以上市民政局每日10时前要向省民政厅上报相关灾情和救灾工作动态信息。<br/><br/>
  3. 灾害发生24小时内，省民政厅派出工作组赶赴灾区指导地方开展救灾工作，慰问灾民，了解灾区救灾情况及需求，根据受灾地区政府申请，48小时内调拨救灾物资；及时组织召开抗灾救灾综合协调会，协调有关部门落实抗灾救灾有关工作，督促基层落实救灾应急措施。<br/><br/>
  4. 根据受灾地政府报告，结合灾情评估报告，省民政厅商省财政厅向省政府申请紧急救灾资金，并及时下拨，督促救灾资金的规范使用。<br/><br/>
  5. 必要时开展救灾捐赠工作，省民政厅向社会公布灾情、灾区需求情况以及接受捐赠的单位和账号，及时下拨救灾款物，对捐赠款物的接收和使用情况进行公告。<br/><br/>
  6. 省民政厅视情组织有关专家赴灾区进行现场灾情和需求评估，形成评估报告，报民政部、省政府；灾情稳定后，组织召开灾情评估会，向有关部门通报评估结果 <br/><br/>";
                } else {
                    if ($affected_population > 1 && $affected_population < 100000
                        && $dead_population > 1 && $dead_population < 20 && $building_collapse > 1 && $building_collapse < 10000
                    ) {
                        $array['name'] = "Ⅳ级响应";
                        $array['content'] = "1　省民政厅在接到灾害发生信息后，1小时内向省政府和民政部报告，之后及时续报有关情况。省减灾委办公室要及时掌握灾情。从灾害发生开始，有关地级以上市民政局每日10时前要向省民政厅上报相关灾情和救灾工作动态信息。
　　2　灾情发生后，省民政厅及时指导地方做好救灾和群众生活安排工作，协调处理相关抗灾救灾事宜；必要时，派出工作组赶赴灾区，慰问灾民；根据受灾地区政府申请，及时调拨救灾物资，商省财政厅下拨省级救灾应急资金。
　　3　省民政厅视情组织有关专家赴灾区进行现场灾情和需求评估，形成评估报告，报民政部、省政府；灾情稳定后，组织召开灾情评估会，向有关部门通报评估结果";
                    }
                }
            }
        }


        return response()->json($array);    //转换成json，发送
    }
}
