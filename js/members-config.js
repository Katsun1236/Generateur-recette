// ==========================================================================
// Members Configuration File
// ==========================================================================
// INSTRUCTIONS:
// 1. To define roles, edit the ROLES object. The 'order' property determines
//    the display order (lower numbers appear first).
// 2. To add a new member, add an object to the 'membersData' array with their
//    name, avatar URL, and the appropriate 'roleId' from the ROLES object.
// ==========================================================================

/**
 * Defines the roles within the faction, their display properties, and hierarchy.
 */
const ROLES = {
    leader: {
        order: 1,
        name: "Leader",
        color: "#E74C3C" // --primary-red from your CSS
    },
    second_in_command: {
        order: 2,
        name: "Bras droit",
        color: "#F1C40F" // --yellow from your CSS
    },
    officer: {
        order: 3,
        name: "Officier",
        color: "#5865F2" // --discord-blue from your CSS
    },
    developer: {
        order: 4,
        name: "Développeur",
        color: "#2ECC71" // --green from your CSS
    },
    member: {
        order: 5,
        name: "Membre",
        color: "#CCCCCC" // --text-medium from your CSS
    }
};

/**
 * Raw data for all members.
 * Simply assign a 'roleId' from the ROLES object above.
 */
const membersData = [
    { name: "Coarse", roleId: "leader", avatar: "https://cdn.discordapp.com/avatars/1034834683659296779/a_ef9c473f05b67f4f4b80f007371e6553.gif" },
    { name: "Mixtaz", roleId: "second_in_command", avatar: "https://cdn.discordapp.com/avatars/1042870120357318777/a0de87cba0cdf03bf09b7740a275d8fa.png" },
    { name: "Urfaveyes", roleId: "officer", avatar: "https://cdn.discordapp.com/avatars/621013206772482078/b93ec81fdbe0e154b2d2c6f005f8aa71.png" },
    { name: "jemangedeschapo", roleId: "officer", avatar: "https://cdn.discordapp.com/avatars/496406824921202690/8e98dfd9c46f1422503f9b743d34924c.png" },
    { name: "Katsun1246", roleId: "developer", avatar: "https://cdn.discordapp.com/avatars/713517299964969010/0d1f2e1207a229e2f5fea16e26a5cbc9.png" },
    { name: "AlexTueur593051", roleId: "member", avatar: "https://cdn.discordapp.com/avatars/1343915702095970397/dd79203c409894a1cfd677c22bfc6314.png" },
    { name: "TomGammeur14", roleId: "member", avatar: "https://cdn.discordapp.com/avatars/410798898999721998/ec83d998e65e0b298502f4927957f197.png" },
    { name: "Zirowzsurmc", roleId: "member", avatar: "https://cdn.discordapp.com/avatars/877272893694828585/871ed5a8d2a2bb0c1e908c106ba8cdb5.png" },
    { name: "Jojosch_21", roleId: "member", avatar: "https://cdn.discordapp.com/avatars/715664772737269870/d64b26270d75176f3cc86065e492ecc2.png" },
    { name: "Axipixi", roleId: "member", avatar: "https://cdn.discordapp.com/avatars/490904591572140034/1645701e94c80852b3ab1a5d3ebe2432.png" },
    { name: "ShakyFlame76283", roleId: "member", avatar: "https://cdn.discordapp.com/avatars/1081568873238769787/d0e63bfca1fd31cb4c71cff496c43c1d.png" },
    { name: "Invinciblus", roleId: "member", avatar: "https://cdn.discordapp.com/avatars/1394681331190988880/87119531c4b4e491bd68f3d7c50484c8.png" },
    { name: "magiquexd", roleId: "member", avatar: "https://cdn.discordapp.com/avatars/1381378796896391259/cf7a6a9fc8ae3adc56982f3c9f051ba5.png" },
    { name: "LimitDrock", roleId: "member", avatar: "https://cdn.discordapp.com/avatars/636941354731044864/2c3eff620fd05132eabd6e34e0a2413c.png" },
];

/**
 * Processes the raw data and exports a single, sorted array of members.
 * This function combines member data with role data.
 */
export const members = membersData
    .map(member => {
        const roleInfo = ROLES[member.roleId] || ROLES.member; // Fallback to 'member' role if ID is invalid
        const fallbackAvatar = `https://cravatar.eu/avatar/${member.name}/128.png`;

        // Special case for Katsun1246 to combine roles
        let finalRoleInfo = { ...roleInfo };
        if (member.name === "Katsun1246") {
            finalRoleInfo.name = `${ROLES.developer.name} & ${ROLES.member.name}`;
        }

        return {
            name: member.name,
            avatar: member.avatar || fallbackAvatar,
            role: finalRoleInfo
        };
    })
    .sort((a, b) => a.role.order - b.role.order); // Sort members by role order