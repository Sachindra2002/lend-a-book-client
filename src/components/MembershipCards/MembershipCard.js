import React from 'react'
import MembershipCardItem from './MembershipCardItem'

function MembershipCard() {
    return (
        <div className="cards">
            <h1>Check out our Membership Subscriptions</h1>
            <div className="cards__container">
                <div className="cards__wrapper">
                    <ul className="cards__items">
                        <MembershipCardItem
                            text="Bronze"
                            colour="#cd7f32"
                            point1="▸ 3 books per user"
                            point2="▸ 5 videos per user"
                            point3="▸ Books could be lent up to 3 weeks"
                            point4="▸ Vidoes could be lent up to 5 days"
                            point5="▸ Charges for a book - 50 LKR"
                            point6="▸ Charges for a video - 100 LKR"
                            point7="▸ Overdue charges per day - 20 LKR"
                            point8="▸ Annual membership fee - 1000LKR"
                        />
                        <MembershipCardItem
                            text="Silver"
                            colour="#C0C0C0"
                            point1="▸ 5 books per user"
                            point2="▸ 7 videos per user"
                            point3="▸ Books could be lent up to 4 weeks"
                            point4="▸ Vidoes could be lent up to 1 week"
                            point5="▸ Charges for a book - 40 LKR"
                            point6="▸ Charges for a video - 80 LKR"
                            point7="▸ Overdue charges per day - 15 LKR"
                            point8="▸ Annual membership fee - 2000 LKR"
                        />
                        <MembershipCardItem
                            text="Gold"
                            colour="#FFD700"
                            point1="▸ 7 books per user"
                            point2="▸ 9 videos per user"
                            point3="▸ Books could be lent up to 4 weeks"
                            point4="▸ Vidoes could be lent up to 10 days"
                            point5="▸ Charges for a book - 30 LKR"
                            point6="▸ Charges for a video - 60 LKR"
                            point7="▸ Overdue charges per day - 10 LKR"
                            point8="▸ Annual membership fee - 3000 LKR"
                        />
                        <MembershipCardItem
                            text="Platinum"
                            colour=" #88D3E1"
                            point1="▸ 10 books per user"
                            point2="▸ 10 videos per user"
                            point3="▸ Books could be lent up to 5 weeks"
                            point4="▸ Vidoes could be lent up to 1 week"
                            point5="▸ Charges for a book - 20 LKR"
                            point6="▸ Charges for a video - 40 LKR"
                            point7="▸ Overdue charges per day - 5 LKR"
                            point8="▸ Annual membership fee - 5000 LKR"
                        />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default MembershipCard
