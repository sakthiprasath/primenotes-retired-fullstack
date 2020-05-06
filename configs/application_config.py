import os
import json

import yaml


class ApplicationConfig:
    INSTANCE = None

    def __init__(self, fields, config_yml_path, override_yml_path=None, verbose=False):
        self.fields = fields
        self.config_yml_path = config_yml_path
        self.override_yml_path = override_yml_path
        self.verbose = verbose

    def get_config(self):
        if self.INSTANCE is None:
            self.INSTANCE = self._load_config()
        return self.INSTANCE

    def get_instance(self):
        """
            This method is maintained for legacy use. For future implementation, use get_config()
        """
        return self.get_config()

    class Config:
        def __init__(self, **kwargs):
            for key, value in kwargs.items():
                setattr(self, key.lower(), value)

        def __str__(self):
            dct = self.__dict__
            dct_temp = dct.copy()
            for key, fields_meta in dct_temp.pop('__fields').items():
                if fields_meta['is_secret']:
                    dct_temp.pop(key.lower())
            return json.dumps(dct_temp, indent=4)

    def _load_config(self):
        # If yml path exists, read from it. Else, from env
        config_dict = {}
        if os.path.exists(self.config_yml_path):
            if self.verbose:
                print('Loading config from: {}'.format(self.config_yml_path))
            with open(self.config_yml_path, 'r', encoding="utf-8") as stream:
                config_dict = yaml.safe_load(stream)

            if self.override_yml_path is not None and os.path.exists(self.override_yml_path):
                if self.verbose:
                    print('Overriding config with: {}'.format(self.override_yml_path))
                with open(self.override_yml_path, 'r', encoding='utf-8') as override_stream:
                    override_yml = yaml.safe_load(override_stream)
                # We override values in config_dict
                if override_yml is not None:
                    for key, value in override_yml.items():
                        config_dict[key] = value

        missing_fields = []
        for field, field_meta in self.fields.items():
            if field not in config_dict and field in os.environ:
                config_dict[field] = field_meta['type'](os.getenv(field))
            elif field in config_dict:
                config_dict[field] = field_meta['type'](config_dict[field])

            if field not in config_dict and field_meta['required']:
                missing_fields.append(field)

        if missing_fields:
            raise Exception('These required configuration fields are missing: {}'.format(repr(missing_fields)))

        config_dict['__FIELDS'] = self.fields
        return self.Config(**config_dict)
