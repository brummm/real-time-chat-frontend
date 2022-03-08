export interface ChatMessage {
	_id: string;
	message: string;
	owner: string;
	inResponseTo?: any;
	createdAt?: Date;
}
