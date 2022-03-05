export interface ChatMessage {
	id: string;
	message: string;
	owner: string;
	inResponseTo?: any;
	createdAt?: Date;
}
