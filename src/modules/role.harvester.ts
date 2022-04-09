export const harvester = {
    run: function (creep: Creep) {
        if (creep.store.getFreeCapacity() > 0) {
            const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {
                    visualizePathStyle: { stroke: "#ffffff" },
                });
            }
        } else {
            if (
                creep.transfer(Game.spawns["Spawn1"], RESOURCE_ENERGY) ==
                ERR_NOT_IN_RANGE
            ) {
                creep.moveTo(Game.spawns["Spawn1"], {
                    visualizePathStyle: { stroke: "#ffaa00" },
                });
            }
        }
    },
};
