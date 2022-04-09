interface CreepMemory {
    /**
     * 该 creep 的角色
     */
    role: string;
    /**
     * 是否正在升级中
     */
    upgrading?: boolean;
    /**
     * 是否正在建造中
     */
    building?: boolean;
}
