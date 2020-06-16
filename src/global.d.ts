declare module 'twitter' {
  import { Coordinates, Entities, ExtendedEntities, Place, FullUser } from 'twitter-d'

  interface Tweet {
    created_at: string
    id: number
    id_str: string
    text: string
    truncated: boolean
    entities: Entities
    extended_entities?: ExtendedEntities | null
    source: string
    in_reply_to_screen_name: string | null
    in_reply_to_status_id_str: string | null
    in_reply_to_status_id: number | null
    in_reply_to_user_id_str: string | null
    in_reply_to_user_id: number | null
    geo: string | null
    coordinates?: Coordinates | null
    place?: Place | null
    contributors: string | null
    is_quote_status: boolean
    retweet_count: number
    favorite_count: number
    favorited: boolean
    retweeted: boolean
    possibly_sensitive: boolean
    possibly_sensitive_appealable: boolean
    lang: string
    user: FullUser
  }

  interface TimelineParameters {
    /**
     * Specifies the number of records to retrieve.
     * Must be less than or equal to 200. Defaults to 20.
     * The value of count is best thought of as a limit to the number of tweets to return because suspended or deleted content is removed after the count has been applied.
     */
    count?: number
    /**
     * Returns results with an ID greater than (that is, more recent than) the specified ID.
     * There are limits to the number of Tweets which can be accessed through the API.
     * If the limit of Tweets has occured since the since_id, the since_id will be forced to the oldest ID available.
     */
    since_id?: string
    /**
     * Returns results with an ID less than (that is, older than) or equal to the specified ID.
     */
    max_id?: string
    /**
     * When set to either true , t or 1 , each Tweet returned in a timeline will include a user object including only the status authors numerical ID.
     * Omit this parameter to receive the complete user object.
     */
    trim_user?: boolean
    /**
     * This parameter will prevent replies from appearing in the returned timeline.
     * Using exclude_replies with the count parameter will mean you will receive up-to count Tweets
     */
    exclude_replies?: boolean
    /**
     * The entities node will not be included when set to false.
     */
    include_entities?: boolean
  }

  type TIMELINE_REQUEST_PARAM<Params> = {
    type: TIMELINE_REQUEST_TYPE
  } & Params

  interface TweetParameters {
    /**
     * The numerical ID of the desired Tweet.
     */
    id: string
    /**
     * When true
     * each Tweet returned in a timeline will include a user object
     * including only the status authors numerical ID.
     * Omit this parameter to receive the complete user object.
     */
    trim_user?: boolean
    /**
     * When true
     * any Tweets returned that have been retweeted by the
     * authenticating user will include an additional current_user_retweet node,
     * containing the ID of the source status for the retweet.
     */
    include_my_retweet?: boolean
    /**
     * The entities node will not be included when set to false.
     */
    include_entities?: boolean
    /**
     * If alt text has been added to any attached media entities,
     * this parameter will return an ext_alt_text value in the top-level key for the media entity.
     * If no value has been set, this will be returned as `null`
     */
    include_ext_alt_text?: boolean
    /**
     * When true, the retrieved Tweet will include a card_uri attribute
     * when there is an ads card attached to the Tweet
     * and when that card was attached using the card_uri value.
     */
    include_card_uri?: boolean
  }
}
