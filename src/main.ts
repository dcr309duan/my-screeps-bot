import { errorMapper } from "@/modules/errorMapper";
import { harvester } from "@/modules/role.harvester";
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
        var harvesterName = "Harvester" + Game.time;
        console.log("Spawning new harvester: " + harvesterName);
        Game.spawns["Spawn1"].spawnCreep([WORK, CARRY, MOVE], harvesterName, {
            memory: { role: "harvester" },
        });
    }

    // 展示正在建造的提示
    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role == "harvester") {
            harvester.run(creep);
        }
    }
});
