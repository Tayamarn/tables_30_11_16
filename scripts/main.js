"use strict";

if (table_type == "individual") {
  document.getElementById("common_table").style.display = "none";
} else if (table_type == "small") {
  document.getElementById("individual_table").style.display = "none";
  document.getElementById("large1").style.display = "none";
  document.getElementById("large2").style.display = "none";
  document.getElementById("large3").style.display = "none";
} else {
  document.getElementById("individual_table").style.display = "none";
}

var teams_data = {
  "team1": team1,
  "team2": team2,
  "team3": team3,
  "team4": team4,
  "team5": team5,
  "team6": team6,
  "team7": team7,
  "team8": team8,
}

function roundToOne(num) {
    return +(Math.round(num + "e+1")  + "e-1");
}


function try_score(team, _try) {
  var proj_score;
  if (team.switch_plan > 5) {
    proj_score = 2.24 * team.switch_type_plan * team[_try].switch;
  } else {
    proj_score = 0;
  }
  var effects_score = Math.min(10 * team[_try].effect, 40);
  var time_score = team[_try].work_time - 40;
  var prep_score;
  if (team[_try].prep_time > 300) {
    prep_score = -20;
  } else if (team[_try].prep_time < 180) {
    prep_score = 20;
  } else {
    prep_score = 0;
  }
  var time_penal = 0;
  if (team[_try].work_time > 90) {
    time_penal = (team[_try].work_time - 90) * 5;
  }
  var excess_stage_time_penal = (team[_try].excess_time_stage_time - 15 * team[_try].excess_time_stage_count) * 5;
  var not_on_time_penal = 5 * team[_try].not_on_time_element_count;
  var manual_restart_penal = 50 * team[_try].manual_restart_count;
  return proj_score + effects_score + time_score + prep_score - time_penal - excess_stage_time_penal - not_on_time_penal - manual_restart_penal;
}

function score(team) {
  return roundToOne(average(try_score(team, "try_1"), try_score(team, "try_2")));
}


function try_stability(team, _try) {
  if (team.node_plan == 0) {
    return ((10 * team[_try].switch / team.switch_plan) + (3 * team[_try].effect / team.effect_plan)) / 13;
  }
  return ((10 * team[_try].switch / team.switch_plan) + (3 * team[_try].effect / team.effect_plan) + (team[_try].node / team.node_plan)) / 14;
}

function stability(team) {
  if (!(typeof(team.try_1.switch) == "number" && typeof(team.try_1.effect) == "number" && typeof(team.try_1.node) == "number" && typeof(team.try_2.switch) == "number" && typeof(team.try_2.effect) == "number" && typeof(team.try_2.node) == "number")) {
    return "";
  }
  return roundToOne(Math.min(try_stability(team, 'try_1'), try_stability(team, 'try_2')));
}

function average(first, second) {
  if (typeof(first) == "number" && typeof(second) == "number") {
    return (first + second) / 2;
  } else {
    return "";
  }
}

function set_individual_vars() {
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
  document.getElementById("score").innerHTML = score(team);
}

function set_common_table() {
  var i;
  for (i = 1; i <= 8; i++) {
    var team = teams_data["team" + i.toString()];
    document.getElementById("team" + i.toString() + "_name").innerHTML = team.name;
    document.getElementById("team" + i.toString() + "_univer").innerHTML = team.univer;
    document.getElementById("team" + i.toString() + "_elements").innerHTML = team.switch_plan + team.effect_plan + team.node_plan;
    document.getElementById("team" + i.toString() + "_stability").innerHTML = stability(team);
    document.getElementById("team" + i.toString() + "_score").innerHTML = score(team);
    document.getElementById("team" + i.toString() + "_votes").innerHTML = team.votes;
    document.getElementById("team" + i.toString() + "_vip_score").innerHTML = team.vip_score;
    document.getElementById("team" + i.toString() + "_price").innerHTML = team.price;
    document.getElementById("team" + i.toString() + "_profit").innerHTML = (score(team) + team.vip_score) * 100 - team.price;
  }
}

if (table_type == "individual") {
  set_individual_vars();
}

if ((table_type == "small") || (table_type == "full")) {
  set_common_table();
}
