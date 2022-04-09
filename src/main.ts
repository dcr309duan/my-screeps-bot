import { errorMapper } from "@/modules/errorMapper";
import { harvester } from "@/modules/role.harvester";
import { upgrader } from "@/modules/role.upgrader";
import _ from "lodash";

export const loop = errorMapper(() => {
    // 清理无效的 creep
    for (const name in Game.creeps) {
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

    // 保持 harvesters 的数量为 2 个
    console.log("harvesters:", harvesters.length);
    if (harvesters.length < 2 && Game.spawns["Spawn1"].spawning == null) {
        var upgraderName = "Harvester" + Game.time;
        console.log("Spawning new harvester: " + upgraderName);
        Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], upgraderName, {
            memory: { role: "harvester" },
        });
    }

    // 获取所有的 upgrader
    const upgraders = _.filter(
        Game.creeps,
        (creep) => creep.memory.role == "upgrader"
    );
    // 保持 upgrader 的数量为 2 个
    console.log("upgraders:", upgraders.length);
    if (upgraders.length < 2 && Game.spawns["Spawn1"].spawning == null) {
        var upgraderName = "Upgrader" + Game.time;
        console.log("Spawning new upgrader: " + upgraderName);
        Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], upgraderName, {
            memory: { role: "upgrader" },
        });
    }

    // 展示正在建造的提示
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
        }
    }
});
