import css, { SystemStyleObject } from '@styled-system/css'
import styled from 'styled-components/native'

interface StyleProps {
  sx?: SystemStyleObject
}

export const ActivityIndicator = styled.ActivityIndicator<StyleProps>((props) => css(props.sx))
export const Button = styled.Button<StyleProps>((props) => css(props.sx))
export const Image = styled.Image<StyleProps>((props) => css(props.sx))
export const ScrollView = styled.ScrollView<StyleProps>((props) => css(props.sx))
export const Text = styled.Text<StyleProps>((props) => css(props.sx))
export const TextInput = styled.TextInput<StyleProps>((props) => css(props.sx))
export const TouchableHighlight = styled.TouchableHighlight<StyleProps>((props) => css(props.sx))
export const TouchableNativeFeedback = styled.TouchableNativeFeedback<StyleProps>((props) => css(props.sx))
export const TouchableOpacity = styled.TouchableOpacity<StyleProps>((props) => css(props.sx))
export const TouchableWithoutFeedback = styled.TouchableWithoutFeedback<StyleProps>((props) => css(props.sx))
export const View = styled.View<StyleProps>((props) => css(props.sx))
