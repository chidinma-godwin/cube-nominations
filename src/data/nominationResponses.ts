/**
 * Generated by @openapi-codegen
 *
 * @version 1.0.0
 */
export type Nominee = {
    data?: {
        nominee_id?: string;
        first_name?: string;
        last_name?: string;
    }[];
};

export type Nominations = {
    data?: {
        nomination_id: string;
        nominee_id: string;
        reason: string;
        process: string;
        date_submitted: string;
        closing_date: string;
    }[];
};

export type Nomination = {
    data?: {
        nomination_id?: string;
        nominee_id?: string;
        reason?: string;
        process?: string;
        date_submitted?: string;
        closing_date?: string;
    };
};

export type Deletion = {
    data?: string;
};

export type AuthToken = {
    data?: {
        authToken?: string;
    };
};

export type Error = {
    data?: {
        error?: string;
    };
};
