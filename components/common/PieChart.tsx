import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { G, Circle, Text as SvgText } from 'react-native-svg';

interface PieChartData {
  value: number;
  color: string;
  name: string;
}

interface PieChartProps {
  data: PieChartData[];
  size: number;
  innerRadius: number;
}

export function PieChart({ data, size, innerRadius }: PieChartProps) {
  const radius = size / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate total value
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Calculate segments
  let startAngle = 0;
  const segments = data.map(item => {
    const percentage = item.value / total;
    const angle = percentage * 360;
    const dashArray = [percentage * circumference, circumference];
    
    // Calculate rotation for this segment
    const rotation = startAngle;
    startAngle += angle;
    
    return {
      ...item,
      percentage,
      dashArray,
      rotation
    };
  });
  
  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G x={radius} y={radius}>
          {segments.map((segment, index) => (
            <Circle
              key={index}
              r={radius - 4} // Slightly smaller to create a border effect
              fill="none"
              stroke={segment.color}
              strokeWidth={radius - innerRadius}
              strokeDasharray={segment.dashArray}
              originX="0"
              originY="0"
              rotation={segment.rotation}
            />
          ))}
          
          {/* Inner circle for empty center */}
          <Circle
            r={innerRadius}
            fill="white"
          />
          
          {/* Total count in center */}
          <SvgText
            x="0"
            y="0"
            fontSize="18"
            fontFamily="Inter-Bold"
            fill="#333"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {total}
          </SvgText>
        </G>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});