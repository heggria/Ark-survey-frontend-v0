import operatorApis from '@/apis/operator'
import store from '@/store'

const getExpMaxLevel = (eliteLevel: number, stars: number): number => {
	switch (eliteLevel) {
		case 0: {
			if (stars <= 2) return 30
			return 50
		}
		case 1: {
			switch (stars) {
				case 3:
					return 55
				case 4:
					return 60
				case 5:
					return 70
				case 6:
					return 80
				default:
					return 0
			}
		}
		case 2: {
			switch (stars) {
				case 4:
					return 70
				case 5:
					return 80
				case 6:
					return 90
				default:
					return 0
			}
		}
		default: {
			return 0
		}
	}
}

export { getExpMaxLevel }
