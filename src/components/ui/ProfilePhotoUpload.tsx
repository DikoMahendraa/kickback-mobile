import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProfilePhotoUploadProps {
  onUpload?: () => void;
  onProvide?: () => void;
  onChangePhoto?: () => void;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  onUpload,
  onChangePhoto,
  onProvide,
}) => {
  return (
    <View className="bg-white items-center justify-center px-8">
      <View className="mb-6">
        <View className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
          <Image
            className="w-full h-full"
            source={require("@/assets/images/fundraiser/fundraiser-project-1.png")}
          />
        </View>
      </View>

      <View className="mb-6">
        <TouchableOpacity
          onPress={onChangePhoto}
          className="bg-primary-01 rounded-lg px-6 py-4"
        >
          <Text
            allowFontScaling={false}
            className="text-white font-semibold text-center"
          >
            Change photo
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row gap-x-3">
        <TouchableOpacity
          onPress={onUpload}
          className="bg-primary-01 flex-1 rounded-lg py-3"
        >
          <Text
            allowFontScaling={false}
            className="text-white font-semibold text-center"
          >
            Upload
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onProvide}
          className="border border-primary-01 bg-white-01 rounded-lg px-4 py-3"
        >
          <Text
            allowFontScaling={false}
            className="text-primary-01 font-semibold text-center"
          >
            Org Provided
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfilePhotoUpload;
