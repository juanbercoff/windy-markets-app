export type ContractType = 'Call' | 'Put';

export type Tradestatus = 'placed' | 'sold';

export interface Trade {
	closePrice: number;
	contractType: ContractType;
	createdAt: string;
	expirationDate: string;
	id: number;
	imageURL: string;
	price: string | null | number;
	status: Tradestatus;
	stock: string;
	strike: number | null;
	updatedAt: string;
}

export interface ModifyTradeFormValues {
	stock: string;
	contractType: string;
	strike: number;
	price: number;
	expirationDate: string;
	image: null;
}

export interface UserTrade {
	amount: number;
	createdAt: string;
	id: number;
	imageURL: string;
	price: number;
	trade: Trade;
	tradeId: number;
	updatedAt: string;
	userId: number;
	closePrice: number;
	status: string;
}

interface Image {
	createdAt: string;
	id: number;
	imageURL: string;
	tradeId: number;
	updatedAt: string;
}
