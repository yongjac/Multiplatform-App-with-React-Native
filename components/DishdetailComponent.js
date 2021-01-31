import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rating: 3,
            author: '',
            comment: '',
            showModal: false
        };
    }

    toggleModal() {
        this.setState({showModal: !this.state.showModal});
    }

    handleSubmit(dishId) {
        this.toggleModal();
        this.props.postComment(dishId, this.state.rating, this.state.author, this.state.comment);
    }

    resetForm() {
        this.setState({
            rating: 3,
            author: '',
            comment: '',
            showModal: false
        });
        this.toggleModal();
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    render() {
        const dishId = this.props.route.params.dishId;
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)} 
                    commentForm={() => this.resetForm()}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View>
                        <Rating 
                            showRating
                            onFinishRating={value => this.setState({ rating: value })}
                            />
                        <Input
                            placeholder='Author'
                            leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                            onChangeText={value => this.setState({ author: value })}
                            />
                        <Input
                            placeholder='Comment'
                            leftIcon={{ type: 'font-awesome', name: 'comment-o'}}
                            onChangeText={value => this.setState({ comment: value })}
                            />
                        <Button 
                            onPress = {() =>{this.handleSubmit(dishId)}}
                            color="#512DA8"
                            title="Submit"
                            />
                        <Text></Text>
                        <Text></Text>
                        <Button
                            onPress = {() =>{this.toggleModal()}}
                            color="gray"
                            title="Cancel"
                            />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

function recognizeComment({ moveX, moveY, dx, dy }) {
    if ( dx > 200)
        return true;
    else
        return false;
}

function RenderDish(props) {

    const dish = props.dish;
    
    handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
        if ( dx < -200 )
            return true;
        else
            return false;
    }

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {this.view.rubberBand(1000).then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));},
        onPanResponderEnd: (e, gestureState) => {
            console.log("pan responder end", gestureState);
            if (recognizeDrag(gestureState)) {
                Alert.alert(
                    'Add Favorite',
                    'Are you sure you wish to add ' + dish.name + ' to favorite?',
                    [
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}},
                    ],
                    { cancelable: false }
                );
            }
            else if (recognizeComment(gestureState)) {
                props.commentForm()
                console.log('recd')
            }

            return true;
        }
    })

    const shareDish = (title, message, url) => {
        Share.share({
            title: title,
            message: title + ': ' + message + ' ' + url,
            url: url
        },{
            dialogTitle: 'Share ' + title
        })
    }

    if (dish != null) {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} useNativeDriver={true}
            ref={this.handleViewRef}
            {...panResponder.panHandlers}>
                    <Card>
                        <Card.Image source={{uri: baseUrl + dish.image}}>
                            <Card.FeaturedTitle 
                                style={{
                                    textAlign: "center", 
                                    marginTop: 55
                                    }}>
                                        {dish.name}
                            </Card.FeaturedTitle>
                        </Card.Image>
                        <Text style={{margin: 10}}>
                            {dish.description}
                        </Text>
                        <View style={styles.formRow}>
                            <Icon
                                raised
                                reverse
                                name={ props.favorite ? 'heart' : 'heart-o'}
                                type='font-awesome'
                                color='#f50'
                                onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                                />
                            <Icon
                                raised
                                reverse
                                name='pencil'
                                type='font-awesome'
                                color='#512DA8'
                                onPress={() => props.commentForm()}
                                />
                            <Icon
                                raised
                                reverse
                                name='share'
                                type='font-awesome'
                                color='#51D2A8'
                                style={styles.cardItem}
                                onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)} 
                                />
                        </View>
                    </Card>
                </Animatable.View>
            );
        }
        else {
            return(<View></View>);
        }
}

function RenderComments(props) {

    const comments = props.comments;
            
    const renderCommentItem = ({item, index}) => {
        
        return (
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 14}}><Rating startingValue={item.rating} imageSize={10} style={{ alignItems: 'flex-start'}} /> </Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date} </Text>
            </View>
        );
    };
    
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}> 
            <Card title='Comments' >
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                    />
            </Card>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);