import Taro, {Component} from '@tarojs/taro'
import {View, ScrollView, Input, Image} from '@tarojs/components'
import './index.scss'
import Feed from '../../components/feed/feed'
import searchPng from '../../asset/images/search.png'
import lightingPng from '../../asset/images/lighting.png'
import {create} from 'dva-core';
import {connect} from '@tarojs/redux'
import action from '../../utils/action'

@connect(({feeds, loading}) => ({
  ...feeds,
  isLoad: loading.effects["feeds/load"],
  isLoadMore: loading.effects["feeds/loadMore"],
}))
export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页',
    enablePullDownRefresh: true,
    backgroundTextStyle: "dark",
  };

  constructor() {
    super(...arguments);
  }

  componentDidMount = () => {
    this.props.dispatch(action("feeds/load"));
  };

  onPullDownRefresh = () => {
    this.props.dispatch(action("feeds/load"));
  };

  onReachBottom = () => {
    this.props.dispatch(action("feeds/loadMore"));
  };

  updateList = () => {
    this.props.dispatch(action("feeds/search",true));
  };

  render() {
    const {list = [], isLoad, isLoadMore} = this.props;
    return (
      <View>
        <View className='search flex-wrp'>
          <View className='search-left flex-item'>
            <View className='flex-wrp'>
              <View className='flex1'><Image src={searchPng}></Image></View>
              <View className='flex6'><Input type='text' placeholder={'搜索话题, 问题或人'}
                                             placeholderClass='search-placeholder'/></View>
            </View>
          </View>
          <View className='search-right flex-item'>
            <Image onClick={this.updateList} src={lightingPng}></Image>
          </View>
        </View>
        <View className='container'>
          {
            list.length ?
              list.map(item => {
                return <Feed
                  key={item}
                  feed_source_img={item.feed_source_img}
                  feed_source_name={item.feed_source_name}
                  feed_source_txt={item.feed_source_txt}
                  question={item.question}
                  answer_ctnt={item.answer_ctnt}
                  good_num={item.good_num}
                  comment_num={item.comment_num}
                />
              }) :
              isLoad ? <View>加载中...</View> : <View>没有数据</View>
          }
          {
            isLoadMore && <View>加载中...</View>
          }
        </View>
      </View>
    )
  }
}

