import React from 'react';
import { ScrollView, Text } from "react-native";

import MenuBackButton from './MenuBackButton'
import Colors from '../constants/Colors';

export default class AboutUs extends React.Component {
    static navigationOptions = {
        header:null
    };

    render() {
        return (
            <ScrollView style={{ backgroundColor: '#FCFFFD', height: '100%' }}>
                <MenuBackButton navigation={this.props.navigation} />
                <Text style={{ fontFamily:'myfont',color: Colors.mainColor, backgroundColor: 'transparent', fontWeight: 'bold', fontSize: 18, margin: 12, marginTop: 20}}>عن تطبيق تذوق</Text>
                <Text style={{fontFamily:'myfont', color: Colors.mainColor, backgroundColor: '#F5FAF7', fontSize: 16, padding: 12, marginTop: 10}}>{`
الحمد لله والصلاة والسلام على رسول الله وعلى آله وصحبه أجمعين، أما بعد :

يسرنا أخي الزائر الكريم أن نقدم لك نبذة مختصرة عن دار ابن الجوزي للنشر والتوزيع.
تـأسـسـت الـدار عـام خـمـس وأربـعمائـة وألـف مـن هـجـرة الـمـصطـفى صـلى الله عـلـيه وسـلـم وهي تهدف إلى:
•	نشر العلم وإشاعة المعرفة وبث الوعي والإسهام في نشر وإحياء التراث الإسلامي.
•	السعي لإحياء التراث الإسلامي وتقريب العلوم الإسلامية وتيسير الاستفادة منها.
•	نشر نفائس الكتب والمراجع الإسلامية وإخراج الجديد من كتب أهل العلم والفضل والتحـقيق من التراث العلمي لسلفنا الصالح ومن سار على دربهم.
•	نشر الرسائل الجامعية النافعة والمفيدة.
•	تقديم المنهج الإسلامي الصحيح والنقي من الشوائب في الاعتقاد والعبادة والمعاملات، وتطهير وتزكية النفوس والقلوب وإحياء المعاني الإيمانية.
•	العناية بالمادة العلمية والتحقيق العلمي.
•	الإخراج الفني الراقي الذي يليق بالكتاب الإسلامي.
•	احترام وتقدير لحقوق التأليف والابتكار وعدم الاعتداء عليها.
•	المشاركة في المعارض الدولية والمحلية المتخصصة .

ونحمد الله عز وجل ونشكره لتوفيقه لنا لهذا العمل وعلى ما لمسناه من أهل العلم من تشجيع ونصح وإرشاد وبارك الله في جهود الجميع  لخدمة دينه وتقريبه للناس كافة.

مع تمنياتنا للجميع بالعلم النافع والعمل الصالح
                `}</Text>
            </ScrollView>
        );
    }
}
