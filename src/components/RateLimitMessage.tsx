import { formattedDateToEpoch } from "../helpers/DateHelper";

const RateLimitMessage = ({resetTime}: { resetTime: number }) => {
  return (
    <div className="rate-limit">
      Rate limited. Try again in {formattedDateToEpoch(resetTime)}
    </div>
  )
};

export default RateLimitMessage;