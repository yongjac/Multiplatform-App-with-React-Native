import React, { Component } from 'react';
import { Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    render() {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} useNativeDriver={true}>
                <Card>
                    <Card.Title>Contact Information</Card.Title>
                    <Card.Divider />
                    <Text style={{color: "#000"}}>121, Clear Water Bay Road{"\n"}</Text>
                    <Text style={{color: "#000"}}>Clear Water Bay, Kowloon{"\n"}</Text>
                    <Text style={{color: "#000"}}>HONG KONG{"\n"}</Text>
                    <Text style={{color: "#000"}}>Tel: +852 1234 5678{"\n"}</Text>
                    <Text style={{color: "#000"}}>Fax: +852 8765 4321{"\n"}</Text>
                    <Text style={{color: "#000"}}>Email:confusion@food.net</Text>
                    <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                        />
                </Card>
            </Animatable.View>
        )
    }
}

export default Contact;