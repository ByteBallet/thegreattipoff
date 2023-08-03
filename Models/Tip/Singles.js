export default class Singles {
	constructor(
		raceid,
		bookieeventid,
		actualcode,
		product,
		betType = "win",
		racedate = null,
		fieldNum,
		fieldName,
		sportType,
		eventType,
		subEventType = null,
		utcTime = null,
		location = null,
		price = null,
		racenum = null,
		silk = null,
		barrier = null,
		eventname = null,
		stake = "",
		comments = "",
		disableBet = false,
		stype = "",
		betproducts = [],
		productGroupType = "fixed",
		betID = null,
		isEachWay = false,
		isJC = false,
		isBonusBet = false,
		isBoost = false,
		boostMode = null,
		betPrice = null,
		boostAvailable = false,
		boostPrice = null,
		maxBoostStake = null,
		legerror = false,
		multiError = false,
		isSGM = false,
		hotbet = null,
		specials = [],
		sprices = null
	) {
		this.eventId = raceid;
		this.bookieeventid = bookieeventid;

		// competitorID[sports -> competitorID, racing -> actualCode]
		this.competitorId = actualcode;

		// product["TIP", "BET"]
		this.product = product;

		/**
		 * betType = [win/place, quddie, exotics[quinella, trifecta ...]]
		 */
		this.betType = betType;
		this.racedate = racedate;
		this.fieldNum = fieldNum;
		this.fieldName = fieldName;

		/**
		 * SportType = [racing/sports]
		 * Eventtype = [racing -> [G, H, R], sports -> [Basketball, Cricket, Rugby etc]]
		 * subEventType= [racing -> [null], sports/Basketball -> [NBA...]]
		 */
		this.sportType = sportType;
		this.eventType = eventType;
		this.subEventType = subEventType;

		this.utcTime = utcTime;
		this.location = location;
		this.price = price;
		this.racenum = racenum;
		this.silk = silk;
		this.barrier = barrier;
		this.eventname = eventname;
		this.stype = stype;
		this.stake = stake;
		this.comments = comments;
		this.disableBet = disableBet;
		this.betproducts = betproducts;
		this.productGroupType = productGroupType;
		this.betID = betID;
		this.isEachWay = isEachWay;
		this.isJC = isJC;
		this.isBonusBet = isBonusBet;
		this.isBoost = isBoost;
		this.boostMode = boostMode;
		this.betPrice = betPrice;
		this.boostAvailable = boostAvailable;
		this.boostPrice = boostPrice;
		this.maxBoostStake = maxBoostStake;
		this.legerror = legerror;
		this.multiError = multiError;
		this.isSGM = isSGM;
		this.hotbet = hotbet;
		this.specials = specials;
		this.sprices = sprices;
	}

	getTipID() {
		return `${this.eventId}_${this.fieldNum}_${this.product}_${this.betType == null ? "win" : this.betType.toLowerCase()}_${this.productGroupType ? this.productGroupType.toLowerCase() : "fixed"}`;
	}

	getActualCode() {
		return this.sportType === "racing" ? this.competitorId : null;
	}

	// tells if the race is horses, greyhounds or harness
	getRaceType() {
		return this.sportType === "racing" ? this.eventType : null;
	}

}
