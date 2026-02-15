/**
 * LabelSelector used for finding a GameServer with matching labels.
 */
export interface LabelSelector {
    /**
     * Labels to match.
     */
    'matchLabels'?: ({
        [key: string]: string;
    });
}
/**
 * LabelSelector used for finding a GameServer with matching labels.
 */
export interface LabelSelector__Output {
    /**
     * Labels to match.
     */
    'matchLabels': ({
        [key: string]: string;
    });
}
