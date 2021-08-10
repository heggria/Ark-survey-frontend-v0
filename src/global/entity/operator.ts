/**
 * 干员练度
 * @param operatorId 干员编号
 * @param potential 潜能
 * @param eliteLevel 精英化等级
 * @param expLevel 干员等级
 * @param skillsLevel 技能等级(总计)
 * @param skills 干员技能
 */
interface IOperatorBox {
	operatorId: number
	potential: number
	eliteLevel: number
	expLevel: number
	skillsLevel: number
	skills: number[]
}

/**
 * 技能
 * @param n 技能名
 * @param k 技能key值
 */
interface ISkill {
	n: string
	k: string
}
/**
 * 干员详细信息
 */
interface IOperator {
	cloneGroup: {}
	profession: {}
	skins: ['string']
	skills: ['string']
	userOperatorInfos: ['string']
	tags: ['string']
	name: 'string'
	description: 'string'
	state: 0
	rate: 0
	maxPotential: 0
	maxEliteLevel: 0
	maxExpLevel: 0
	maxSkillLevel: 0
	onlineDate: 'string'
}

/**
 * 干员简单描述
 * @param id
 * @param cName 中文名
 * @param name 英文名
 * @param rate 星级
 * @param key 干员key值
 * @param skills 干员技能
 */
interface IOperatorLight {
	id: number
	cName: string
	name: string
	rate: number
	key: string
	skills: ISkill[]
}
export { IOperatorBox, ISkill, IOperator, IOperatorLight }
