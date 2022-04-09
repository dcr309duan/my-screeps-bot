import { errorMapper } from "@/modules/errorMapper";
import { harvester } from "@/modules/role.harvester";
import { upgrader } from "@/modules/role.upgrader";
import { builder } from "./modules/role.builder";
import _ from "lodash";

const HARVESTER_COUNT = 2; // 工人数量
const UPGRADER_COUNT = 3; // 升级者数量
const BUILDER_COUNT = 4; // 建造者数量

export const loop = errorMapper(() => {
    // 清理无效的 creep
    for (const name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log("Clearing non-existing creep memory:", name);
        }
    }

    // 获取所有的 harvesters
    const harvesters = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "harvester"
    );
    // 获取所有的 upgrader
    const upgraders = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "upgrader"
    );
    // 获取所有的 builder
    const builders = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "builder"
    );

    // 保持 harvesters 的数量
    if (
        harvesters.length < HARVESTER_COUNT &&
        Game.spawns["Spawn1"].spawning == null
    ) {
        var name = "Harvester" + Game.time;
        console.log("Spawning new harvester: " + name);
        Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE, MOVE], name, {
            memory: { role: "harvester" },
        });
    } else if (
        // 保持 upgrader 的数量
        upgraders.length < UPGRADER_COUNT &&
        Game.spawns["Spawn1"].spawning == null
    ) {
        var name = "Upgrader" + Game.time;
        console.log("Spawning new upgrader: " + name);
        Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE, MOVE], name, {
            memory: { role: "upgrader" },
        });
    } else if (
        // 保持 builder 的数量
        builders.length < BUILDER_COUNT &&
        Game.spawns["Spawn1"].spawning == null
    ) {
        var name = "Builder" + Game.time;
        console.log("Spawning new builder: " + name);
        Game.spawns["Spawn1"].spawnCreep([WORK, WORK, CARRY, MOVE], name, {
            memory: { role: "builder" },
        });
    }

    // 展示正在生产 screep 的提示
    if (Game.spawns["Spawn1"].spawning) {
        var spawningCreep = Game.creeps[Game.spawns["Spawn1"].spawning.name];
        Game.spawns["Spawn1"].room.visual.text(
            "🛠️" + spawningCreep.memory.role,
            Game.spawns["Spawn1"].pos.x + 1,
            Game.spawns["Spawn1"].pos.y,
            { align: "left", opacity: 0.8 }
        );
    }

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role == "harvester") {
            harvester.run(creep);
        } else if (creep.memory.role == "upgrader") {
            upgrader.run(creep);
        } else if (creep.memory.role == "builder") {
            builder.run(creep);
        }
    }
});
