"use strict";

var teams_data = {
  "team1": team1,
  "team2": team2,
}

var NormalCft = 1.12

function try_score(team, _try) {
  if (team.switch_plan > 5) {
    var proj_score = 2 * NormalCft * team.switch_plan * team[_try].switch;
  } else {
    var proj_score = 0;
  }
  var node_score = 10 * team[_try].node;

}

function score(team) {

}


function try_stability(team, _try) {
  if (team.node_plan == 0) {
    return ((10 * team[_try].switch / team.switch_plan) + (3 * team[_try].effect / team.effect_plan)) / 13
  }
  return ((10 * team[_try].switch / team.switch_plan) + (3 * team[_try].effect / team.effect_plan) + (team[_try].node / team.node_plan)) / 14
}

function stability(team) {
  if (!(typeof(team.try_1.switch) == "number" && typeof(team.try_1.effect) == "number" && typeof(team.try_1.node) == "number" && typeof(team.try_2.switch) == "number" && typeof(team.try_2.effect) == "number" && typeof(team.try_2.node) == "number")) {
    return ""
  }
  return Math.min(try_stability(team, 'try_1'), try_stability(team, 'try_2'))
}

function average(first, second) {
  if (typeof(first) == "number" && typeof(second) == "number") {
    return (first + second) / 2;
  } else {
    return "";
  }
}

function set_vars() {
  var team = teams_data[current_team];
  document.getElementById("team_name").innerHTML = team.name;
  document.getElementById("switch_plan").innerHTML = team.switch_plan;
  document.getElementById("effect_plan").innerHTML = team.effect_plan;
  document.getElementById("node_plan").innerHTML = team.node_plan;
  document.getElementById("switch_type_plan").innerHTML = team.switch_type_plan;

  document.getElementById("switch_real_1").innerHTML = team.try_1.switch;
  document.getElementById("switch_real_2").innerHTML = team.try_2.switch;
  document.getElementById("switch_real_average").innerHTML = average(team.try_1.switch, team.try_2.switch);

  document.getElementById("effect_real_1").innerHTML = team.try_1.effect;
  document.getElementById("effect_real_2").innerHTML = team.try_2.effect;
  document.getElementById("effect_real_average").innerHTML = average(team.try_1.effect, team.try_2.effect);

  document.getElementById("node_real_1").innerHTML = team.try_1.node;
  document.getElementById("node_real_2").innerHTML = team.try_2.node;
  document.getElementById("node_real_average").innerHTML = average(team.try_1.node, team.try_2.node);

  document.getElementById("work_time_1").innerHTML = team.try_1.work_time;
  document.getElementById("work_time_2").innerHTML = team.try_2.work_time;
  document.getElementById("work_time_average").innerHTML = average(team.try_1.work_time, team.try_2.work_time);

  document.getElementById("prep_time_1").innerHTML = team.try_1.prep_time;
  document.getElementById("prep_time_2").innerHTML = team.try_2.prep_time;
  document.getElementById("prep_time_average").innerHTML = average(team.try_1.prep_time, team.try_2.prep_time);

  document.getElementById("stability").innerHTML = stability(team);
  document.getElementById("score").innerHTML = team.score;
}
set_vars();