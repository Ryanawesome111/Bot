import { Command, CommandContext } from "./Command";
import Members from "../data/members";
import Leveling from "../modules/xp/leveling";
import Guilds from "../data/guilds";
import { injectable } from 'tsyringe';

@injectable()
export default class XPCommand implements Command {
    name = 'xp';
    summary = 'Display the XP card of a user.';
    cooldown = 10;

    constructor(private members: Members) {}

    execute = async(ctx: CommandContext) =>  {
        const guildUser = await this.members.get(ctx.member);
        const guild = await new Guilds().get(ctx.guild);

        const info = Leveling.xpInfo(guildUser.xpMessages, guild.xp.xpPerMessage);

        await ctx.channel.send(`
            **Level**: ${info.level}\n**XP**: ${info.exp}\n**Next Level**: ${info.xpForNextLevel}`);
    };
}

